import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { FiSliders } from "react-icons/fi";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

function Collection() {
  const [showFilter, setShowFilter] = useState(false);

  const { products, search } = useContext(shopDataContext);

  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;

    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    let productCopy = [...products];

    if (search?.trim()) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProduct(productCopy);
  }, [products, search, category, subCategory]);

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  return (
    <main
      className="
        w-full
        min-h-screen
        bg-gradient-to-br
        from-[#fff5fb]
        via-[#fff9fc]
        to-[#ffeaf6]
        pt-[80px]
        md:pt-[90px]
        pb-[90px]
        overflow-x-hidden
      "
    >
      <div className="md:hidden px-4 pt-5">
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="
            w-full
            h-[48px]
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#F83EAD]
            text-white
            font-semibold
            shadow-md
            active:scale-[0.98]
            transition
          "
        >
          <FiSliders className="text-lg" />

          {showFilter ? "Hide Filters" : "Show Filters"}

          {showFilter ? (
            <FaChevronDown className="text-sm" />
          ) : (
            <FaChevronRight className="text-sm" />
          )}
        </button>
      </div>

      <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row">
        <aside
          className={`
            w-full
            md:w-[260px]
            lg:w-[280px]
            md:min-h-[calc(100vh-90px)]
            px-4
            md:px-5
            lg:px-6
            pt-5
            md:pt-8
            shrink-0
            ${showFilter ? "block" : "hidden md:block"}
          `}
        >
          <div
            className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              border-gray-200
              p-5
              sticky
              top-[105px]
            "
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Filters
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Refine your products
                </p>
              </div>

              {(category.length > 0 || subCategory.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="
                    text-xs
                    text-[#F83EAD]
                    font-medium
                    hover:underline
                  "
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                CATEGORIES
              </h3>

              <div className="space-y-3">
                {["Men", "Women", "Kids", "Both"].map((item) => (
                  <label
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-gray-600
                      cursor-pointer
                      hover:text-[#F83EAD]
                      transition
                    "
                  >
                    <input
                      type="checkbox"
                      value={item}
                      checked={category.includes(item)}
                      onChange={toggleCategory}
                      className="
                        w-4
                        h-4
                        accent-[#F83EAD]
                        cursor-pointer
                      "
                    />

                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 mt-6 pt-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                SUB-CATEGORIES
              </h3>

              <div className="space-y-3">
                {["Powder", "Syrup", "Tablets", "Oil"].map((item) => (
                  <label
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-gray-600
                      cursor-pointer
                      hover:text-[#F83EAD]
                      transition
                    "
                  >
                    <input
                      type="checkbox"
                      value={item}
                      checked={subCategory.includes(item)}
                      onChange={toggleSubCategory}
                      className="
                        w-4
                        h-4
                        accent-[#F83EAD]
                        cursor-pointer
                      "
                    />

                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>
        <section className="flex-1 min-w-0 px-4 md:px-5 lg:px-8 pt-6 md:pt-8">

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
              mb-7
            "
          >
            <Title
              text1="ALL"
              text2="COLLECTIONS"
            />

            {/* Product Count */}
            <div
              className="
                bg-white
                border
                border-gray-200
                rounded-full
                px-4
                py-2
                text-sm
                text-gray-600
                shadow-sm
                w-fit
              "
            >
              {filterProduct.length} Products
            </div>
          </div>
          {filterProduct.length > 0 ? (
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                gap-4
                sm:gap-5
                lg:gap-6
              "
            >
              {filterProduct.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image1}
                />
              ))}
            </div>
          ) : (
            <div
              className="
                min-h-[400px]
                flex
                flex-col
                items-center
                justify-center
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                px-5
                text-center
              "
            >
              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-pink-100
                  flex
                  items-center
                  justify-center
                  text-2xl
                  mb-4
                "
              >
                🌿
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                No Products Found
              </h2>

              <p className="text-sm text-gray-500 mt-2 max-w-[350px]">
                Try changing your search or removing some filters to find
                more products.
              </p>

              <button
                onClick={clearFilters}
                className="
                  mt-5
                  px-5
                  py-2.5
                  bg-[#F83EAD]
                  text-white
                  rounded-full
                  text-sm
                  font-medium
                  hover:bg-[#e92d9c]
                  transition
                "
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Collection;
