import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params

  // Consultamos en Supabase el producto específico
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error || !product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Botón para regresar al catálogo */}
        <div className="mb-8">
          <Link 
            href="/"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            ← Volver al Catálogo
          </Link>
        </div>

        {/* Contenedor principal del detalle */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          
          {/* Imagen del producto */}
          <div className="h-96 md:h-full w-full rounded-2xl overflow-hidden bg-gray-100 relative">
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información del producto */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-4">{product.name}</h1>
              <p className="text-3xl font-black text-gray-900 mt-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              {/* Cambiamos el botón con onClick por un div con estilo limpio para evitar el error de Server Components */}
              <div className="w-full py-4 bg-gray-900 text-white text-center font-medium rounded-2xl shadow-sm">
                Próximamente: Carrito y Pasarela de Pagos
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  )
}