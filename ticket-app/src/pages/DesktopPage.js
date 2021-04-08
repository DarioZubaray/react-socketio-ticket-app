import React, { useContext, useState } from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { useMenu } from '../hooks/useMenu';
import { getUserStorage } from '../helpers/getUserStorage';
import { Redirect, useHistory } from 'react-router';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

export const DesktopPage = () => {

    useMenu(true);
    const [ user ] = useState( getUserStorage() );
    const { socket } = useContext( SocketContext );
    const [ticketAssigned, setTicketAssigned] = useState(null);
    const history = useHistory();

    if (!user.agent || !user.desktop) {
        return <Redirect to="/enter" />
      }

    const close = () => {
        console.log('Close');
        localStorage.clear();
        history.replace('/enter');
    }

    const nextTicket= () => {
        console.log('Next ticket', user);
        socket.emit('next-ticket', { ...user }, (ticket) => {
            console.log(ticket);
            setTicketAssigned(ticket);
        });
    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={2}>{ user.agent }</Title>
                    <Text>You are working at desktop number: </Text>
                    <Text type="success">{ user.desktop }</Text>
                </Col>

                <Col span={4} align="right">
                    <Button shape="round" type="danger" onClick={close}>
                        <CloseCircleOutlined />
                        Close
                    </Button>
                </Col>
            </Row>

            <Divider />

            <Row>
                <Col>
                    <Text>you are attending ticket number: </Text>
                    {
                        ticketAssigned && (
                            <Text style={{ fontSize: 30 }}>{ticketAssigned.number}</Text>
                        )
                    }
                </Col>
            </Row>

            <Row>
                <Col offset={18} span={6} align="right">
                    <Button onClick={nextTicket} shape="round" type="primary">
                        <RightOutlined />
                        Next ticket
                    </Button>
                </Col>
            </Row>
        </>
    )
}
