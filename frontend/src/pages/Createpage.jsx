import { Container,  Input,  useColorModeValue, VStack, Heading, Box, Button, useToast } from '@chakra-ui/react';
import React from 'react'
import { useProductStore } from '../store/product';

const Createpage = () => {
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const {createProduct} = useProductStore();
  
  const toast = useToast()
  const handleAddProduct = async () => {
      const {success, message} = await createProduct(product)

      if(success) {
        toast({
          title: message,
          status: "success",
          isClosable: true,
        })
      }
      else {
        toast({
          title: message,
          status: "error",
          isClosable: true,
        })
      }

      setProduct({
        name: "",
        price: "",
        image: "",
      })
  }

  return (
     <Container maxW={"container.sm"} marginTop={"200px"}>
        <VStack spacing={8} >
          <Heading as={"h1"} size="2xl" textAlign="center" mb={8}>
            Create new Product
          </Heading>

          <Box
            w={"full"}
            bg={useColorModeValue("white:500", "gray.900")}
            p={6}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack spacing={4}> 
              <Input
                placeholder="Product Name"
                name="name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                name="price"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={product.image}
                onChange={(e) => setProduct({ ...product, image: e.target.value })}
              />

              <Button colorScheme='blue' onClick={handleAddProduct} width={"100%"}>
                Add Product
              </Button>

            </VStack>

          </Box>
        </VStack>
     </Container>
  )
}

export default Createpage