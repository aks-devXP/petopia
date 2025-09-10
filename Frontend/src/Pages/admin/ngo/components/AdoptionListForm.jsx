import React, { useState } from 'react'
import { CreateAdoptionPet } from '@/API/PetApi'
import { UploadImageAPI } from '@/API/GeneralAPI'

const AdoptionListForm = () => {
  const [form, setForm] = useState({ name: '', age: '', category: 'dog', otherCategory: '', breed: '', description: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const [descWords, setDescWords] = useState(0)

  const onChange = (e) => {
    const { name, value } = e.target
    if (name === 'description') {
      const words = value.trim().split(/\s+/).filter(Boolean)
      if (words.length > 10) {
        const trimmed = words.slice(0, 10).join(' ')
        setForm((f) => ({ ...f, description: trimmed }))
        setDescWords(10)
        return
      }
      setDescWords(words.length)
    }
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      alert('Please login to list a pet for adoption.')
      return
    }
    const categoryToSend = form.category === 'other' ? (form.otherCategory || '').trim() : form.category
    const descCount = (form.description || '').trim().split(/\s+/).filter(Boolean).length
    if (!form.name || !form.age || !categoryToSend || !form.breed || !form.description || !imageFile || descCount > 10) {
      alert('Please fill all fields and add one image.')
      return
    }
    setSubmitting(true)
    try {
      const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      const b64 = await toBase64(imageFile)
      const upload = await UploadImageAPI(b64, `adopt-${Date.now()}-`)
      if (!upload?.success || !upload?.url) throw new Error('Image upload failed')

      await CreateAdoptionPet({
        name: form.name,
        age: form.age,
        category: categoryToSend,
        breed: form.breed,
        description: form.description,
        image: upload.url,
      })
      setForm({ name: '', age: '', category: 'dog', otherCategory: '', breed: '', description: '' })
      setImageFile(null)
      setImagePreview('')
      alert('Your pet has been submitted for adoption. Contact details and city are taken from your profile.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <h3 className="text-xl font-semibold text-gray-900">List a Pet for Adoption</h3>
      <p className="mt-1 text-sm text-gray-600">Provide basic details, one image, and a short description. Your profile city and contact will be shown to interested adopters.</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input name="name" value={form.name} onChange={onChange} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input name="age" value={form.age} onChange={onChange} required type="number" min="0" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" value={form.category} onChange={onChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>
        {form.category === 'other' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specify Category</label>
            <input
              name="otherCategory"
              value={form.otherCategory}
              onChange={onChange}
              required
              placeholder="e.g., Rabbit, Parrot"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
          <input name="breed" value={form.breed} onChange={onChange} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <span className={`text-xs ${descWords > 10 ? 'text-red-600' : 'text-gray-500'}`}>{descWords}/10 words</span>
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            required
            rows={3}
            placeholder="Keep it concise (max 10 words)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Pet Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setImageFile(file)
              const url = URL.createObjectURL(file)
              setImagePreview(url)
            }}
            className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-rose-50 file:px-3 file:py-2 file:text-rose-700 hover:file:bg-rose-100"
            required
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-3 h-36 w-full object-cover rounded-md ring-1 ring-gray-200" />
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-3">
        {!token && <span className="text-sm text-amber-700 bg-amber-50 px-2 py-1 rounded">Login required to submit</span>}
        <button disabled={submitting || !token} className="rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-700 disabled:opacity-50">{submitting ? 'Submitting...' : 'Submit Listing'}</button>
      </div>
    </form>
  )
}

export default AdoptionListForm
