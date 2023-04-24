import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Desktop1 from "./pages/Desktop1";
import { useEffect } from "react";
import { Amplify, Auth, PubSub} from 'aws-amplify';
import awsExports from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react';
import {AWSIoTProvider} from '@aws-amplify/pubsub';

Amplify.configure(awsExports);

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: 'us-east-1',
    aws_pubsub_endpoint: 'wss://a25w67mn0bb0hm-ats.iot.us-east-1.amazonaws.com/mqtt'
  })
);

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  Auth.currentCredentials().then((info) => {
    const cognitoIdentityId = info.identityId;
    const accessKeyId = info.accessKeyId;
    const sessionToken = info.sessionToken;
    const secretAccessKey = info.secretAccessKey;
    const identityId = info.identityId;
    const authenticated = info.authenticated;
    
    console.log(cognitoIdentityId);
    console.log(accessKeyId);
    console.log(sessionToken);
    console.log(secretAccessKey);
    console.log(identityId);
    console.log(authenticated);
  });

  return (
    <Routes>
      <Route path="/" element={<Desktop1 />} />
    </Routes>
  );
}
export default withAuthenticator(App);
