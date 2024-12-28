import ProductCard from '../components/ProductCard';
import { useProductStore } from '../store/product';
import { Container, SimpleGrid, Text, textDecoration, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  const {products, fetchProducts} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products", products);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={8} width={"full"}>
          {products.map((product) => (
            product && <ProductCard key={product._id} product={product} />
          ))}

        </SimpleGrid>

          {/* If no products are available */}
          {products.length === 0 && (  
            <Text
              fontSize={"xl"}
              textAlign={"center"}
              fontWeight={"bold"}
              color={"gray.500"}
              >
            No products available{" "}
            <Link to={"/create"}>
              <Text as={"span"} color={"blue.500"} _hover={{textDecoration: "underline"}}>
                Create one
              </Text>
            </Link>
          </Text>
        )}

      </VStack>
    </Container>
  )
}

export default Homepage