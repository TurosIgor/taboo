export const colorReducer = (colors, action) => {
    switch (action.type) {
        case "SWITCH_BACKGROUND":
            return {...colors, 
                bgColor: {
                    from: action.bgColorFrom, 
                    to: action.bgColorTo
                }, 
                uiColor: {
                    from: action.uiColorFrom, 
                    to: action.uiColorTo
                }};
        case "SWITCH_TEAM_COLOR":
            return {...colors, 
                [action.team]: {
                    bg: { 
                        from: action.bgColorFrom, 
                        to: action.bgColorTo
                    }, 
                    ui: { 
                        from: action.uiColorFrom, 
                        to: action.uiColorTo
                    }}};
        default:
            return colors;
    }
}