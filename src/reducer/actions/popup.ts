import { OpenPromotionBox } from '@/types/types';
import actionTypes from '../actionTypes';

export const openPromotion = ({ rank, file, x, y }: OpenPromotionBox) => {
    return {
        type: actionTypes.PROMOTION_OPEN,
        payload: { rank, file, x, y }
    }
}

export const closePopup = () => {
    return {
        type: actionTypes.PROMOTION_CLOSE,
    }
}
