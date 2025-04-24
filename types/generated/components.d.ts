import type { Schema, Struct } from '@strapi/strapi';

export interface SharedBeforeAfter extends Struct.ComponentSchema {
  collectionName: 'components_shared_before_afters';
  info: {
    description: '';
    displayName: 'BeforeAfter';
    icon: 'landscape';
  };
  attributes: {
    afterPhoto: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    beforePhoto: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.before-after': SharedBeforeAfter;
      'shared.seo': SharedSeo;
    }
  }
}
