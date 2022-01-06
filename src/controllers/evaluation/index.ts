import { Evaluation } from "@models/entity/Evaluation"
import { getRepository } from "typeorm"
import { EvaluationRequest } from '@service/evaluation/EvaluationRequest'
import { EvaluationService } from '@service/evaluation/EvaluationService'
import { HttpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"

const httpResponseHandler = new HttpResponseHandler()
const evaluationService = new EvaluationService()

export const getAllEvaluation = async (request, response) => {
  const { page = 0, count = 50 } = request.query
  const evaluationRepository = getRepository(Evaluation)
  const evaluations = await evaluationRepository.find({ skip: page, take: count })
  return response.json({ evaluations })
}

export const getEvaluation = async (request, response) => {
  const { id } = request.params
  const evaluationRepository = getRepository(Evaluation)
  const evaluation = await evaluationRepository.findOne(id)
  return response.json({ evaluation })
}

export const createEvaluation = async (request, response) => {
  try {
    const evaluationRequest = EvaluationRequest.convertFromHttpBody(request.body)
    const result = await evaluationService.createEvaluationService(evaluationRequest)
    return httpResponseHandler.createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}

export const updateEvaluation = async (request, response) => {
  try {
    const { mentorName, score, feedback } = request.body
    const { id } = request.params
    const evaluationUpdated = await evaluationService.editEvaluation(
      id,
      mentorName,
      score,
      feedback)
    return httpResponseHandler.createSuccessResponse(message.UPDATED, evaluationUpdated, response)
  } catch (error) {
    console.log(error)
    return httpResponseHandler.createErrorResponse(error, response)
  }
}

export const deleteEvaluation = async (request, response) => {
  try {
    const result = await evaluationService.deleteEvaluation(request.params.id)
    return httpResponseHandler.createSuccessResponse(message.REMOVED, result, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}