import { FC } from "react";
import LoginForm from "../components/LoginForm"
import { Card, Layout, Row } from "antd";

const Login: FC = () => {
    return ( 
        <Layout>
            <Row align={"middle"} justify={"center"} className="h100">
                <Card>
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    );
}

export default Login;