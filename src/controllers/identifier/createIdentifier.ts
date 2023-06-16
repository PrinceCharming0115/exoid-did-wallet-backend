import { Request, Response, response } from 'express';
import axios from 'axios';
import httpStatus from 'http-status';
import { v4 } from 'uuid';

import 'dotenv/config';

import { accountService } from 'services';

import { errorHandlerWrapper } from 'utils';

import { IDENTIFIER_METADATA } from 'consts';

export const createIdentifierValidator = () => {
	return [];
}

type Params= unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const createIdentifierHandler = async (
	req: Request<Params, ResBody, ReqBody, ReqQuery>,
	res: Response
) => {

	const headers = {
		'Authorization': `Basic ${process.env.CREATE_IDENTIFIER_TOKEN}`,
		'Content-Type': 'application/json'
	};

	const response = await axios.post(process.env.ISSUER_NODE_IDENTIFIER_ENDPOINT || '', IDENTIFIER_METADATA, { headers });

	const newVendor = v4(); // generating uuid

	await accountService.createAccount({UUID: newVendor, identifier: response.data.identifier})

	res.status(httpStatus.CREATED).json({ result: response.data });
}

export const createIdentifier = errorHandlerWrapper(createIdentifierHandler);