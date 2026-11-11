import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  // Consultamos en Supabase los productos que coincidan con la categoría
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', decodedCategory)

  if (error || !products || products.length === 0) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <Link 
            href="/"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            ← Volver al Catálogo Principal
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">
            Categoría: {decodedCategory}
          </h1>
          <p className="mt-2 text-gray-600">
            Explora todos los artículos disponibles bajo esta selección.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100"
            >
              <div className="h-64 w-full relative bg-gray-100">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mt-3">{product.name}</h2>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                  <Link 
                    href={`/productos/${product.slug}`}
                    className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}