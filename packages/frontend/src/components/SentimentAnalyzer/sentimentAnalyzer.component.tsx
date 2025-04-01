import { useState, useEffect } from 'react';
import { Input, Button, Card, Alert, Typography, Space, Row, Col, theme } from 'antd';
import { useSentiment } from '../../hooks/useSentiment';
import { InputValidationSchema } from '@shared/schemas';
import { SentimentResultModal } from '../';

const { TextArea } = Input;
const { Title, Text } = Typography;

const minLength = InputValidationSchema.minLength || 1;
const maxLength = InputValidationSchema.maxLength || 500;

export const SentimentAnalyzer = () => {
  const { token } = theme.useToken();
  const [inputText, setInputText] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    mutate: analyzeSentiment,
    isPending,
    isError,
    error,
    data: sentimentResult,
    isSuccess,
    reset,
  } = useSentiment();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setValidationError(null);
  };

  const handleSubmit = () => {
    try {
      InputValidationSchema.parse(inputText);
      analyzeSentiment(inputText);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'errors' in err) {
        const zodError = err as { errors?: Array<{ message?: string }> };
        setValidationError(zodError.errors?.[0]?.message || 'Invalid input');
      } else {
        setValidationError('Invalid input');
      }
    }
  };

  const resetAndAnalyzeAgain = () => {
    setIsModalVisible(false);
    setInputText('');
    reset();
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleTryAgain = () => {
    analyzeSentiment(inputText);
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setIsModalVisible(true);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Card
        style={{
          width: 800,
          margin: '0 auto',
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadow,
        }}
      >
        <Title level={3} style={{ marginBottom: token.marginLG }}>
          Sentiment Analyzer
        </Title>

        <Space direction="vertical" size={token.marginMD} style={{ width: '100%' }}>
          <Text>
            Enter text to analyze sentiment ({minLength}-{maxLength} characters):
          </Text>

          <TextArea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your text here..."
            autoSize={{ minRows: 5, maxRows: 8 }}
            status={validationError ? 'error' : ''}
            disabled={isPending}
            style={{ borderRadius: token.borderRadius }}
          />

          {validationError && <Alert type="error" message={validationError} showIcon />}

          <Row justify="space-between" align="middle">
            <Col>
              <Text type={inputText.length > maxLength ? 'danger' : 'secondary'}>
                {inputText.length} / {maxLength} characters
              </Text>
            </Col>
            <Col>
              <Button onClick={handleSubmit} disabled={inputText.trim() === '' || isPending} loading={isPending}>
                {isPending ? 'Analyzing...' : 'Analyze Sentiment'}
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      <SentimentResultModal
        isVisible={isModalVisible}
        isError={isError}
        isSuccess={isSuccess}
        sentimentResult={sentimentResult}
        error={error}
        onClose={handleModalClose}
        onTryAgain={handleTryAgain}
        onAnalyzeAnother={resetAndAnalyzeAgain}
      />
    </>
  );
};
