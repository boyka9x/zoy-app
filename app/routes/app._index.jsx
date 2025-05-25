import { BlockStack, Button, Card, Layout, Page, Text } from '@shopify/polaris';
import { ExternalIcon } from '@shopify/polaris-icons';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }) => {
    const { session, sessionToken, admin } = await authenticate.admin(request);
    const accessToken = session.accessToken;
    const domain = session.shop;
    let pixelId = null;

    const pixel = await admin.graphql(`#graphql
        query {
            webPixel {
                id
                settings
            }
    }`);

    const pixelData = await pixel.json();

    if (pixelData.data.webPixel) {
        pixelId = pixelData.data.webPixel.id;
    } else {
        const res = await admin.graphql(
            `#graphql
            mutation webPixelCreate($webPixel: WebPixelInput!) {
                webPixelCreate(webPixel: $webPixel) {
            userErrors {
                field
                message
                code
            }
            webPixel {
                id
                settings
            }
        }
    }`,
            {
                variables: {
                    webPixel: {
                        settings: {
                            accountID: domain,
                        },
                    },
                },
            },
        );

        const data = await res.json();

        if (data.data.webPixelCreate.userErrors.length > 0) return null;

        if (data.data.webPixelCreate.webPixel) {
            pixelId = data.data.webPixelCreate.webPixel.id;
        } else {
            return null;
        }
    }

    await fetch('http://localhost:5000/api/shopify/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken.sig}`,
        },
        body: JSON.stringify({
            domain,
            accessToken,
            pixelId: pixelId,
        }),
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
