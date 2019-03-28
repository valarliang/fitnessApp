import { createStackNavigator, createAppContainer } from 'react-navigation';
import BottomNav from "./BottomNav";
import EntryDetail from "./EntryDetail";
import { purple, white } from "../utils/colors";

BottomNav.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

const MainNav = createStackNavigator({
  Home: BottomNav,
  EntryDetail,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: purple,
    },
    headerTintColor: white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});


export default createAppContainer(MainNav);
