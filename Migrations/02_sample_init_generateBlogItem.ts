import { MigrationModule } from '@kentico/kontent-cli';
import { ManagementClient } from '@kentico/kontent-management';
/**
 * Creates a sample content item of type Blog.
 */
const migration: MigrationModule = {
    order: 2,
    run: async (apiClient: ManagementClient) => {
        for (let i = 0; i < 3; i++) {
            // Create content item
            const itemResponse = await apiClient
                .addContentItem()
                .withData({
                    name: 'Post ' + i,
                    type: {
                        codename: 'post',
                    },
                })
                .toPromise();

            // Create language variant in default language
            const variantResponse = await apiClient
                .upsertLanguageVariant()
                .byItemId(itemResponse.data.id)
                .byLanguageCodename('default')
                .withData((builder) => [
                    builder.textElement({
                        element: {
                            codename: 'title',
                        },
                        value: 'Post ' + i,
                    }),
                    builder.textElement({
                        element: {
                            codename: 'content',
                        },
                        value: `<h1>Post ${i}</h1>\n<p>Maecenas malesuada. In hac habitasse platea dictumst. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Nunc interdum lacus sit amet orci. Maecenas malesuada.</p>`,
                    }),
                ])
                .toPromise();

            await apiClient
                .publishLanguageVariant()
                .byItemId(variantResponse.data.item.id as string)
                .byLanguageCodename('default')
                .withoutData()
                .toPromise();
        }
    },
};

export default migration;
