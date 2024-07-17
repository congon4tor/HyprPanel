const network = await Service.import("network");
import { openMenu } from "../utils.js";

const Network = () => {
  const wifiIndicator = [
    Widget.Icon({
      class_name: "bar-network-icon",
      icon: network.wifi.bind("icon_name"),
    }),
    Widget.Label({
      class_name: "bar-network-label",
      label: network.wifi
        .bind("ssid")
        .as((ssid) => (ssid ? `  ${ssid}` : "  --").substring(0, 7)),
    }),
  ];

  const wiredIndicator = [
    Widget.Icon({
      class_name: "bar-network-icon",
      icon: network.wired.bind("icon_name"),
    }),
    Widget.Label({
      class_name: "bar-network-label",
      label: network.bind("wired").as(() => "  Wired"),
    }),
  ];

  return {
    component: Widget.Box({
      vpack: "center",
      class_name: "bar-network",
      children: network
        .bind("primary")
        .as((w) => (w === "wired" ? wiredIndicator : wifiIndicator)),
    }),
    isVisible: true,
    boxClass: "network",
    props: {
      on_primary_click: (clicked, event) => {
        openMenu(clicked, event, "networkmenu");
      },
    },
  };
};

export { Network };
