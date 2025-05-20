import { BlockStack, Button, Card, Layout, Page, Text } from '@shopify/polaris';
import { ExternalIcon } from '@shopify/polaris-icons';
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
                            <BlockStack gap="400">
                                <Text as="h2" variant="headingMd">
                                    🎉 Connected successfully!
                                </Text>
                                <Text as="p" variant="bodyMd" tone="subdued">
                                    The Heatmap, Record & Replay app is now
                                    connected to your store. You can now start
                                    monitoring sessions and visualizing customer
                                    interactions.
                                </Text>
                            </BlockStack>

                            <div style={{ marginTop: '16px' }}>
                                <Button
                                    icon={ExternalIcon}
                                    variant="primary"
                                    onClick={() =>
                                        window.open(
                                            'https://your-app-url.com',
                                            '_blank',
                                        )
                                    }
                                >
                                    Open App
                                </Button>
                            </div>
                        </Card>
                    </Layout.Section>
                </Layout>
            </BlockStack>
        </Page>
    );
}
