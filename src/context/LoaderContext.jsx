import { createContext, useContext, useState, useCallback, useRef } from 'react'

const LoaderContext = createContext(null)

export function LoaderProvider({ children }) {
  /* Start as TRUE so loader shows instantly on first render — no flash */
  const [visible, setVisible] = useState(true)
  const [projectsRevealed, setProjectsRevealed] = useState(false)
  const callbackRef = useRef(null)

  const triggerLoader = useCallback((onComplete) => {
    callbackRef.current = onComplete || null
    setVisible(true)
  }, [])

  const handleLoaderDone = useCallback(() => {
    setVisible(false)
    if (callbackRef.current) {
      callbackRef.current()
      callbackRef.current = null
    }
  }, [])

  return (
    <LoaderContext.Provider value={{
      visible, triggerLoader, handleLoaderDone,
      projectsRevealed, setProjectsRevealed,
    }}>
      {children}
    </LoaderContext.Provider>
  )
}

export function useLoader() {
  const ctx = useContext(LoaderContext)
  if (!ctx) throw new Error('useLoader must be inside LoaderProvider')
  return ctx
}