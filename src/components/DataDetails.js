import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export const dataforclient= [{
    title: "TOTAL BOOKED",
    isMoney: false,
    link: "See all booked",
    icon: (
      <PersonOutlineIcon
        className="icon"
        sx={{
          color: "#E97451",
          backgroundColor: "#F4BAA9",
        }}
      />
    )
},{
    title: "FAVORITES",
    isMoney: false,
    link: "See all favorites",
    icon: (
      <ShoppingCartOutlinedIcon
        className="icon"
        sx={{
          color: "#E9C46A",
          backgroundColor: "#F7EAC9"
        }}
      />
    )
},{
    title: "EXPENSES",
        isMoney: true,
        link: "View net expenses",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            sx={{
              color: "#264653",
              backgroundColor: "#B3D1DC",
            }}
          />
        )
},{
    title: "REVIEW",
        isMoney: false,
        link: "See available review detail",
        icon: (
          <AccountBalanceWalletIcon
            className="icon"
            sx={{
              color: "#F4A261",
              backgroundColor: "#FCE5D2",
            }}
          />
        )
}]