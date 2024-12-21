import { GetServerSideProps } from 'next';
import cookie from 'cookie';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = context.req.headers.cookie;
    const parsedCookies = cookie.parse(cookies || '');
    const accessToken = parsedCookies.accessToken || null;

    return {
        props: {
        token: accessToken,
        },
    };
};