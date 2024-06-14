export const useLogout = () => {
  localStorage.removeItem('user')

  window.location.href = './'
}
