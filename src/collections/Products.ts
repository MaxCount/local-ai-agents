import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'status'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название товара',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly версия названия (автозаполняется)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      label: 'Цена (BYN)',
    },
    {
      name: 'salePrice',
      type: 'number',
      min: 0,
      label: 'Цена со скидкой (BYN)',
      admin: {
        description: 'Оставьте пустым, если скидки нет',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Рекомендуемый товар',
      defaultValue: false,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Изображения',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Изображение',
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Категория',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Опубликован', value: 'published' },
        { label: 'Черновик', value: 'draft' },
      ],
      defaultValue: 'draft',
      required: true,
    },
  ],
};
