export const getToken = () => {
    const token = localStorage.getItem('guardadmin_token')
    return `Bearer ${token}`
}