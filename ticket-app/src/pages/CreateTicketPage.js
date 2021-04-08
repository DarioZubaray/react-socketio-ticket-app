import React, { useContext, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useMenu } from '../hooks/useMenu';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

export const CreateTicketPage = () => {

    useMenu(false);
    const { socket } = useContext(SocketContext);
    const [ lastTicket, setLastTicket] = useState(null);

    const newTicket = () => {

        socket.emit('request-ticket', null, (ticketCreated) => {
            console.log(ticketCreated)
            setLastTicket(ticketCreated);
        });
    }

    return (
        <>
            <Row>
                <Col span={ 14 } offset={6} align="center">
                    <Title level={3}>Create new Ticket</Title>

                    <Button
                        type="primary"
                        shape="round"
                        icon={ <DownloadOutlined /> }
                        size="large"
                        onClick={ newTicket }
                    >
                        New Ticket
                    </Button>
                </Col>
            </Row>

            {
                lastTicket && (
                    <Row style={{ marginTop: 100 }}>
                        <Col span={ 14 } offset={6} align="center">
                            <Text>Your number</Text>
                            <br />
                            <Text type="success" style={{ fontSize: 55}}>
                                { lastTicket?.number }
                            </Text>
                        </Col>
                    </Row>
                )
            }
        </>
    )
}
