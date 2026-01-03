import { motion } from "framer-motion";
import Image from "next/image";

export function PageRedirectLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-body-crx">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <div className="relative  p-4 rounded-xl">
              <Image src="/images/logo-full.png" alt="Critix Logo" width={200} height={300} className="w-full" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-text-secondary mb-2"
              >
                Sua opinião amplificada
              </motion.p>
            </div>
          </div>
        </motion.div>
        <div className="w-16 h-16 border-4 border-primary-crx border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white">Carregando...</p>
      </div>
    </div>
  );
}
