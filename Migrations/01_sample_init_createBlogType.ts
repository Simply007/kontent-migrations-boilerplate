import { MigrationModule } from '@kentico/kontent-cli';
import {
    ContentTypeElementsBuilder,
    ContentTypeModels,
    ManagementClient,
} from '@kentico/kontent-management';

/**
 * Creates content type called Blog.
 * This content type has three text elements: title, author and text.
 */
const migration: MigrationModule = {
    order: 1,
    run: async (apiClient: ManagementClient) => {
        await apiClient
            .addContentType()
            .withData(BuildBlogPostTypeData)
            .toPromise();
    },
};

const BuildBlogPostTypeData = (
    builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
    return {
        name: 'Post',
        codename: 'post',
        elements: [
            builder.textElement({
                name: 'Title',
                codename: 'title',
                type: 'text',
            }),
            builder.assetElement({
                name: 'Image',
                codename: 'image',
                type: 'asset',
                allowed_file_types: 'adjustable',
            }),
            builder.richTextElement({
                name: 'Content',
                codename: 'content',
                type: 'rich_text',
                is_required: true,
                maximum_text_length: {
                    applies_to: 'words',
                    value: 500,
                },
            }),
        ],
    };
};

export default migration;
