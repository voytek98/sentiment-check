import { Layout, theme } from 'antd';
import { SentimentAnalyzer } from './components';
import './App.css';

const { Content } = Layout;

function App() {
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgContainer }}>
      <Content
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 1280,
          maxWidth: '100%',
          margin: '0 auto',
          padding: '20px 0',
        }}
      >
        <SentimentAnalyzer />
      </Content>
    </Layout>
  );
}

export default App;
