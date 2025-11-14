import { create } from "zustand";

// Safe window.puter access
const getPuter = () =>
  typeof window !== "undefined" && window.puter ? window.puter : null;

export const usePuterStore = create((set, get) => {
  const setError = (msg) =>
    set({
      error: msg,
      isLoading: false,
    });

  const waitForPuter = () =>
    new Promise((resolve) => {
      if (getPuter()) return resolve(true);

      const interval = setInterval(() => {
        if (getPuter()) {
          clearInterval(interval);
          resolve(true);
        }
      }, 50);
    });

  const checkAuthStatus = async () => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) {
      setError("Puter not found");
      return false;
    }

    try {
      const signed = await puter.auth.isSignedIn();

      if (signed) {
        const user = await puter.auth.getUser();

        set({
          auth: {
            user,
            isAuthenticated: true,
            signIn,
            signOut,
            refreshUser,
            checkAuthStatus,
            getUser: () => user,
          },
          isLoading: false,
        });

        return true;
      } else {
        set({
          auth: {
            user: null,
            isAuthenticated: false,
            signIn,
            signOut,
            refreshUser,
            checkAuthStatus,
            getUser: () => null,
          },
          isLoading: false,
        });

        return false;
      }
    } catch (err) {
      setError(err.message || "Auth check failed");
      return false;
    }
  };

  const signIn = async () => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    set({ isLoading: true });

    try {
      await puter.auth.signIn();
      await checkAuthStatus();
    } catch (err) {
      setError(err.message || "Sign-in failed");
    }
  };

  const signOut = async () => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    set({ isLoading: true });

    try {
      await puter.auth.signOut();
      await checkAuthStatus();
    } catch (err) {
      setError(err.message || "Sign-out failed");
    }
  };

  const refreshUser = async () => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    try {
      const user = await puter.auth.getUser();

      set({
        auth: {
          user,
          isAuthenticated: true,
          signIn,
          signOut,
          refreshUser,
          checkAuthStatus,
          getUser: () => user,
        },
      });
    } catch (err) {
      setError(err.message || "Failed to refresh user");
    }
  };

  const init = async () => {
    set({ isLoading: true });

    await waitForPuter();
    set({ puterReady: true });

    await checkAuthStatus();
  };

  const write = async (path, data) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.fs.write(path, data);
  };

  const readFile = async (path) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.fs.read(path);
  };

  const readDir = async (path) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.fs.readdir(path);
  };

  const upload = async (files) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.fs.upload(files);
  };

  const deleteFile = async (path) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.fs.delete(path);
  };

  const chat = async (prompt, imageURL, testMode, options) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.ai.chat(prompt, imageURL, testMode, options);
  };

  const feedback = async (path, message) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.ai.chat(
      [
        {
          role: "user",
          content: [
            { type: "file", puter_path: path },
            { type: "text", text: message },
          ],
        },
      ],
      { model: "claude-3-7-sonnet" }
    );
  };

  const img2txt = async (image, testMode) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.ai.img2txt(image, testMode);
  };

  const getKV = async (key) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.kv.get(key);
  };

  const setKV = async (key, value) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.kv.set(key, value);
  };

  const deleteKV = async (key) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.kv.delete(key);
  };

  const listKV = async (pattern, returnValues = false) => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.kv.list(pattern, returnValues);
  };

  const flushKV = async () => {
    await waitForPuter();

    const puter = getPuter();
    if (!puter) return setError("Puter not found");

    return puter.kv.flush();
  };

  return {
    isLoading: false,
    error: null,
    puterReady: false,

    auth: {
      user: null,
      isAuthenticated: false,
      signIn,
      signOut,
      refreshUser,
      checkAuthStatus,
      getUser: () => get().auth.user,
    },

    fs: {
      write,
      read: readFile,
      readDir,
      upload,
      delete: deleteFile,
    },

    ai: {
      chat,
      feedback,
      img2txt,
    },

    kv: {
      get: getKV,
      set: setKV,
      delete: deleteKV,
      list: listKV,
      flush: flushKV,
    },

    init,
    clearError: () => set({ error: null }),
  };
});
