import { BlockStack, Card, Layout, Page, Text } from '@shopify/polaris';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }) => {
    const { session, sessionToken } = await authenticate.admin(request);

    const accessToken = session.accessToken;
    const domain = session.shop;

    await fetch('http://localhost:5000/api/shopify/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken.sig}`,
        },
        body: JSON.stringify({ domain, accessToken }),
    });

    return null;
};

export default function Index() {
    return (
        <Page>
            <BlockStack gap="500">
                <Layout>
                    <Layout.Section>
                        <Card>
                            <BlockStack gap="500">
                                <BlockStack gap="200">
                                    <Text as="h2" variant="headingMd">
                                        Congratulations! The Record & Heatmap
                                        app has been successfully connected. 🎉
                                    </Text>
                                </BlockStack>
                            </BlockStack>
                        </Card>
                    </Layout.Section>
                </Layout>
            </BlockStack>
        </Page>
    );
}
