import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  message,
  Skeleton,
  Button,
} from 'antd';
import { Area } from '@ant-design/charts';
import { ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal'; // Import untuk animasi fade-in
import {
  fetchStats,
  fetchVisitorTrends,
  fetchLatestBlogs,
  fetchLatestComments,
  fetchLatestVisitors,
  fetchLatestAssessments,
} from '../services/dashboard'; // sesuaikan path importnya ya!

const Dashboard = () => {
  const [statsData, setStatsData] = useState([]);
  const [visitorData, setVisitorData] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [latestComments, setLatestComments] = useState([]);
  const [latestAssesments, setLatestAssessments] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, visitorRes, blogsRes, commentsRes, assessmentsRes] =
        await Promise.all([
          fetchStats(),
          fetchVisitorTrends(),
          fetchLatestBlogs(),
          fetchLatestComments(),
          fetchLatestAssessments(),
        ]);

      setStatsData(statsRes.data.data);
      setVisitorData(visitorRes.data.data);
      setLatestBlogs(blogsRes.data.data);
      setLatestComments(commentsRes.data.data);
      setLatestAssessments(assessmentsRes.data.data);
    } catch (error) {
      console.error(error);
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const config = {
    data: visitorData.map((item) => ({
      date: item.date,
      count: Number(item.count),
    })),
    xField: 'date',
    yField: 'count',
    height: 300,
    smooth: true,
    autoFit: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 2000,
      },
    },
    style: {
      fill: 'linear-gradient(-90deg, white 0%, blue 100%)',
    },
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Refresh Button */}
      <div style={{ marginBottom: 24 }}>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={loadDashboardData}
        >
          Refresh Data
        </Button>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]}>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card>
                  <Skeleton active paragraph={false} />
                </Card>
              </Col>
            ))
          : statsData.map((stat, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Fade triggerOnce>
                  <Card style={{ background: '#f9f9f9' }}>
                    <Statistic title={stat.title} value={stat.value} />
                  </Card>
                </Fade>
              </Col>
            ))}
      </Row>

      {/* Visitor Trend */}
      <Card style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Visitor Trend (Last 7 Days)</h3>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          {loading ? (
            <Skeleton active style={{ height: 300 }} />
          ) : (
            <Area {...config} />
          )}
        </div>
      </Card>

      {/* Latest Section */}
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} md={8}>
          <Card title="Latest Blogs" style={{ minHeight: 300 }}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
              <Fade triggerOnce>
                <Table
                  dataSource={latestBlogs}
                  columns={[
                    { title: 'Title', dataIndex: 'title', key: 'title' },
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                  ]}
                  pagination={false}
                  size="small"
                />
              </Fade>
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Latest Comments" style={{ minHeight: 300 }}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
              <Fade triggerOnce>
                <Table
                  dataSource={latestComments}
                  columns={[
                    { title: 'User', dataIndex: 'user', key: 'user' },
                    { title: 'Comment', dataIndex: 'comment', key: 'comment' },
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                  ]}
                  pagination={false}
                  size="small"
                />
              </Fade>
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Latest Assessments Submittor" style={{ minHeight: 300 }}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
              <Fade triggerOnce>
                <Table
                  dataSource={latestAssesments}
                  columns={[
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Email', dataIndex: 'email', key: 'email' },
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                  ]}
                  pagination={false}
                  size="small"
                />
              </Fade>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
