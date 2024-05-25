import { Request, Response } from 'express';
import ZTableNames from '../../utils/constants/databaseSchema/tableNames';
import {
  sendBackFailedResponse,
  sendBackNotFoundResponse,
  sendBackSuccessResponse
} from '../../utils/helpers';
import messages from '../../utils/constants/messages';
import { fbDB } from '../../config/firebase';

export const getOasisPlotDetails = async (req: Request, res: Response) => {
  try {
    const _itemQrCode = req.body.plotQrCode;

    if (_itemQrCode?.trim()?.length > 0) {
      const _items = await fbDB
        .collection(ZTableNames.oasis)
        .where('qrCodeNumber', '==', _itemQrCode)
        .get();

      if (_items?.docs?.length > 0) {
        const _item = _items.docs[0];
        return sendBackSuccessResponse(res, {
          item: { id: _item.id, ..._item.data() }
        });
      } else {
        return sendBackNotFoundResponse(res, {
          message: messages.oasis.notFound
        });
      }
    } else {
      return sendBackFailedResponse(res, {
        messages: messages.oasis.plotQrCodeMissing
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return sendBackFailedResponse(res, {
        messages: error.message
      });
    }
    return sendBackFailedResponse(res, {
      messages: messages.general.fetchFailed
    });
  }
};
