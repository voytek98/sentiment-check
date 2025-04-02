import { Layout, theme } from 'antd';
import { SentimentAnalyzer } from '../../components';

const { Content } = Layout;

function Home() {
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
          padding: 20,
        }}
      >
        <SentimentAnalyzer />
      </Content>
    </Layout>
  );
}

export default Home;
