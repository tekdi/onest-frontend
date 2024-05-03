import React from 'react';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";

const OrderSuccessModal = ({ isOpen, onClose, orderId, message }) => {
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent textAlign={'center'} padding={10}>
                <Text fontSize={22} fontFamily={'fantasy'}>
                   {t('Thank_you_for_applying_application_number_is')}: </Text>
                <ModalCloseButton />
                <ModalBody alignSelf={'center'} marginTop={7}>
                    <Box padding={3} width={250} background={'gray.600'}> <Text color={'white'} fontWeight={500}> {orderId}</Text></Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};


export default OrderSuccessModal;

