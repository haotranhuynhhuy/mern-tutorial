export const initState = {
    isLoading: true,
    isAuthenticated: false,
    user: null
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                isLoading: false,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user
            }

        default:
            return state;
    }
}
export default authReducer;