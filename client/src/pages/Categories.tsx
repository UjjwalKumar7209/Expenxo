import { useEffect, useState } from "react";
import clientApi, { apiError, type Category } from "../api";
export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const load = () => {
    clientApi
      .categories()
      .then(setCategories)
      .catch((e) => setError(apiError(e)))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);
  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await clientApi.addCategory(name.trim());
      setName("");
      load();
    } catch (e) {
      setError(apiError(e));
    }
  };
  const update = async (category: Category) => {
    const updated = prompt("Rename category", category.name)?.trim();
    if (!updated || updated === category.name) return;
    try {
      await clientApi.updateCategory(category.id, updated);
      load();
    } catch (e) {
      setError(apiError(e));
    }
  };
  const remove = async (category: Category) => {
    if (
      !confirm(`Delete ${category.name}? Existing expenses may prevent this.`)
    )
      return;
    try {
      await clientApi.deleteCategory(category.name);
      setCategories((current) =>
        current.filter((item) => item.id !== category.id),
      );
    } catch (e) {
      setError(apiError(e));
    }
  };
  return (
    <div className="max-w-3xl space-y-7">
      <p className="text-neutral-600">
        Organize expenses with categories that fit your life.
      </p>
      {error && (
        <div className="border-2 border-black bg-[#FECACA] p-3 font-bold">
          {error}
        </div>
      )}
      <form
        onSubmit={add}
        className="flex flex-col gap-3 border-2 border-black bg-[#BFDBFE] p-5 shadow-[4px_4px_0_#171717] sm:flex-row"
      >
        <input
          required
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="flex-1"
        />
        <button className="border-2 border-black bg-[#FDE047] px-5 py-3 font-black">
          Add category ↗
        </button>
      </form>
      <section className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_#171717]">
        <h2 className="text-xl font-black">Your categories</h2>
        {loading ? (
          <p className="py-8">Loading categories...</p>
        ) : categories.length ? (
          <div className="mt-4 divide-y-2 divide-neutral-200">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <span className="font-black">{category.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => update(category)}
                    className="border-2 border-black px-3 py-2 font-bold hover:bg-[#D9F99D]"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => remove(category)}
                    className="border-2 border-black px-3 py-2 font-bold hover:bg-[#FECACA]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-8 text-neutral-600">
            No categories yet. Add one to start recording expenses.
          </p>
        )}
      </section>
    </div>
  );
}
