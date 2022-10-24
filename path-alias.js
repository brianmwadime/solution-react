const path = require('path');

module.exports = {
  "@": path.resolve(__dirname, "src"),
  "App": path.resolve(__dirname, "src"),
  "App/*": path.resolve(__dirname, "src/*"),
  "Components": path.resolve(__dirname, "src/components"),
  "Components/*": path.resolve(__dirname, "src/components/*"),
  "Pages": path.resolve(__dirname, "src/pages"),
  "Pages/*": path.resolve(__dirname, "src/pages/*"),
  "HOCs": path.resolve(__dirname, "src/hoc"),
  "HOCs/*": path.resolve(__dirname, "src/hoc/*"),
  "Util": path.resolve(__dirname, "src/util"),
  "Util/*": path.resolve(__dirname, "src/Util/*"),
  "Service": path.resolve(__dirname, "src/service"),
  "Service/*": path.resolve(__dirname, "src/service/*"),
  "Hooks": path.resolve(__dirname, "src/hooks"),
  "Hooks/*": path.resolve(__dirname, "src/hooks/*"),
  "Modals": path.resolve(__dirname, "src/modals"),
  "Modals/*": path.resolve(__dirname, "src/modals/*"),
}; 