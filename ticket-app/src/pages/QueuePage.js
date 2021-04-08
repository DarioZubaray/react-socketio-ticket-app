import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Typography, List, Card, Tag, Divider } from 'antd';
import { useMenu } from '../hooks/useMenu';
import { SocketContext } from '../context/SocketContext';
import { getLastestTickets } from '../helpers/getLastestTickets';

const { Title, Text} = Typography;

export const QueuePage = () => {

    useMenu(false);
    const { socket } = useContext( SocketContext );
    const [ tickets, setTickets ] = useState([]);

    useEffect(() => {
        socket.on('ticket-assigned', (assigned) => {
            console.log(assigned);
            setTickets(assigned);
        });
        return () => {
            socket.off('ticket-assigned');
        }
    }, [socket]);

    useEffect(() => {
        getLastestTickets().then(setTickets);
    }, []);

    return (
        <>
            <Title level={1}>Atending customer</Title>

            <Row>
                <Col span={12}>
                    <List
                        dataSource={tickets?.slice(0, 3)}
                        renderItem={ ticket => (
                            <List.Item>
                                <Card 
                                    style={{width: 335, marginTop: 16}}
                                    actions={[
                                        <Tag color="volcano">{ticket.agent}</Tag>,
                                        <Tag color="magenta">Desktop: {ticket.desktop}</Tag>,
                                    ]}
                                >
                                    <Title>Number: {ticket.number}</Title>
                                </Card>
                            </List.Item>
                        )}
                     />
                </Col>

                <Col span={12}>
                    <Divider>History</Divider>
                    <List 
                        dataSource={tickets?.slice(3)}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta 
                                    title={`Ticket number ${tickets.number}`}
                                    description={
                                        <>
                                            <Text type="secondary">At the desktop: </Text>
                                            <Tag color="cyan">{item.number}</Tag>

                                            <Text type="secondary">Agent: </Text>
                                            <Tag color="gold">{item.agent}</Tag>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    )
}
