"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold leading-tight md:text-7xl"
        >
          Build a Professional CV
          <span className="text-blue-600"> in Minutes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-gray-600"
        >
          Create a modern, ATS-friendly resume completely free.
          No design skills required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link href="/builder">
            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
              Create My CV
            </button>
          </Link>

          <button className="rounded-xl border px-8 py-4 font-semibold hover:bg-gray-100">
            View Templates coming soon...
          </button>
        </motion.div>
      </div>
    </section>
  );
}