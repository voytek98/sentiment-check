import { Button, Modal, Result, Space, Typography } from 'antd';
import { AnalyzeSentimentMutation } from '../../gql/graphql';
import { analyzeSentimentResult } from '../../utils/sentimentAnalyzer.utils';

const { Paragraph, Title } = Typography;

interface SentimentResultModalProps {
  isVisible: boolean;
  isError: boolean;
  isSuccess: boolean;
  sentimentResult?: AnalyzeSentimentMutation['analyzeSentiment'];
  error?: Error | null;
  onClose: () => void;
  onTryAgain: () => void;
  onAnalyzeAnother: () => void;
}

export const SentimentResultModal = ({
  isVisible,
  isError,
  isSuccess,
  sentimentResult,
  error,
  onClose,
  onTryAgain,
  onAnalyzeAnother,
}: SentimentResultModalProps) => {
  const renderModalContent = () => {
    if (isError) {
      return (
        <Result
          status="error"
          title={
            <Title level={3} role="heading">
              Analysis Failed
            </Title>
          }
          subTitle={error?.message || 'Something went wrong during sentiment analysis.'}
          extra={
            <Button type="primary" onClick={onTryAgain}>
              Try Again
            </Button>
          }
        />
      );
    }

    if (isSuccess && sentimentResult) {
      const analysis = analyzeSentimentResult(sentimentResult);

      return (
        <Result
          status={analysis.status}
          title={`Sentiment: ${sentimentResult.label.charAt(0).toUpperCase() + sentimentResult.label.slice(1)}`}
          subTitle={`Score: ${sentimentResult.score.toFixed(2)}`}
          extra={
            <Button type="primary" onClick={onAnalyzeAnother}>
              Analyze Another Text
            </Button>
          }
        >
          <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'left' }}>
            <Paragraph>
              <strong>What this means:</strong> {analysis.description}
            </Paragraph>
            <Paragraph>
              <strong>Pro Tip:</strong> {analysis.tip}
            </Paragraph>
          </Space>
        </Result>
      );
    }

    return null;
  };

  return (
    <Modal
      open={isVisible}
      footer={null}
      closable={true}
      onCancel={onClose}
      maskClosable={true}
      width={700}
      centered
      destroyOnClose
    >
      {renderModalContent()}
    </Modal>
  );
};
