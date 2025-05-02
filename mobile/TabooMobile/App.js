import { StatusBar, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (<>
      <StatusBar translucent backgroundColor="transparent" />
      <WebView 
        source={{ uri: 'http://a95bf67416de94fdb9189e25e95d83f6-1000143536.eu-north-1.elb.amazonaws.com/'}} 
        style={{height: '100vh'}}
        allowsBackForwardNavigationGestures
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onError={(error) => console.log('WebView error:', error)}
        renderError={(errorName) => <ErrorComponent />}
      />
    </>
  )
}

const ErrorComponent = () => {
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Text>Website failed to load. Check your connection.</Text>
  </View>
}
