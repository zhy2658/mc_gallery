export const useDarkMode = () => {
  const isDark = useCookie('dark-mode', { default: () => false })
  
  const toggleDark = () => {
    isDark.value = !isDark.value
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }
  
  const initDarkMode = () => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }
  
  return { isDark, toggleDark, initDarkMode }
}