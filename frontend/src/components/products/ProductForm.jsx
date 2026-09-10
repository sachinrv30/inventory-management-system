import { useState } from 'react';
import { Input } from '../shared/Input';
import { Select } from '../shared/Select';
import { Button } from '../shared/Button';
import { CATEGORIES } from '../../utils/stockStatus';

const EMPTY_FORM = { name: '', category: 'Electronics', price: '', quantity: '', minStock: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Product name is required.';
  if (form.price === '' || Number(form.price) < 0) errors.price = 'Price must be greater than or equal to 0.';
  if (form.quantity === '' || Number(form.quantity) < 0 || !Number.isInteger(Number(form.quantity))) {
    errors.quantity = 'Quantity must be a whole number, 0 or greater.';
  }
  if (form.minStock === '' || Number(form.minStock) < 0 || !Number.isInteger(Number(form.minStock))) {
    errors.minStock = 'Minimum stock must be a whole number, 0 or greater.';
  }
  return errors;
}

export function ProductForm({ initialProduct, onSubmit, onCancel, submitLabel }) {
  const [form, setForm] = useState(
    initialProduct
      ? {
          name: initialProduct.name,
          category: initialProduct.category,
          price: String(initialProduct.price),
          quantity: String(initialProduct.quantity),
          minStock: String(initialProduct.minStock),
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
        minStock: Number(form.minStock),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <Input
        id="product-name"
        label="Product name"
        placeholder="e.g. Wireless Mouse"
        value={form.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
      />

      <Select
        id="product-category"
        label="Category"
        value={form.category}
        onChange={(e) => handleChange('category', e.target.value)}
      >
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </Select>

      <Input
        id="product-price"
        label="Price (₹)"
        type="number"
        min="0"
        step="0.01"
        placeholder="0.00"
        value={form.price}
        onChange={(e) => handleChange('price', e.target.value)}
        error={errors.price}
      />

      <div className="product-form__row">
        <Input
          id="product-quantity"
          label="Quantity"
          type="number"
          min="0"
          step="1"
          placeholder="0"
          value={form.quantity}
          onChange={(e) => handleChange('quantity', e.target.value)}
          error={errors.quantity}
        />
        <Input
          id="product-min-stock"
          label="Minimum stock"
          type="number"
          min="0"
          step="1"
          placeholder="0"
          value={form.minStock}
          onChange={(e) => handleChange('minStock', e.target.value)}
          error={errors.minStock}
          hint="Products at or below this level show up as low stock."
        />
      </div>

      <div className="product-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={submitting}>Cancel</Button>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
