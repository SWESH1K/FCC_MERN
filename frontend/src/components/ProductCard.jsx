import { useProductStore } from '../store/product';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("gray.100", "gray.700");
    const toast = useToast();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const {deleteProduct, updateProduct} = useProductStore();
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);

        if(success) {
            toast({
                title: "Product deleted",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
        else {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    }
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);

        if(success) {
            toast({
                title: "Product Updated",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
        else {
            toast({
                title: "Product Updation Failed",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
        onClose();
    }

    return (
        <Box 
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{transform: "translateY(-4px)", shadow: "xl"}}
        bg={bg}
        >
            <Image src={product.image} alt={product.name} width={"full"} height={64} objectFit={"cover"} />
            <Box p={4}>
                <Heading as="h3" size={"md"} mb={2}>
                    {product.name}
                </Heading>

                <Text fontSize={"xl"} fontWeight={"bold"} color={textColor} mb={4}>
                    Rs.{product.price}
                </Text>

                <HStack spacing={2} >
                    <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
                    <IconButton icon={<DeleteIcon/>} colorScheme='red' onClick={() => {handleDeleteProduct(product._id)}}  />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalBody>
                        <VStack padding={4}>
                            <Input placeholder='Product Name' name='name' 
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                            />
                            <Input placeholder='Product Price' name='price' type='number' 
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                            />
                            <Input placeholder='Image URI' name='image' 
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {handleUpdateProduct(product._id, updatedProduct)}}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default ProductCard