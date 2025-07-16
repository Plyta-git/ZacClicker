// eslint-disable-next-line @typescript-eslint/no-var-requires
const { COLORS } = require("./src/const/colors");

module.exports = {
  theme: {
    extend: {
      colors: {
        chat: COLORS.chat,
        "color-border": COLORS.colorBorder,
        "main-bg": COLORS.mainBg,
        "sidebar-bg": COLORS.sidebarBg,
        main: COLORS.main,
        "main-active": COLORS.mainActive,
        "sidebar-active": COLORS.sidebarActive,
        donate: COLORS.donate,
        "reaction-waiting": COLORS.reactionWaiting,
        "reaction-ready": COLORS.reactionReady,
        "reaction-result": COLORS.reactionResult,
      },
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
      },
    },
  },
};
