import { Router } from 'express'

import charactersController from '../controllers/charactersController.js'
import episodesController from '../controllers/episodesController.js'
import seasonsController from '../controllers/seasonsController.js'

const router = Router()

router.post('/characters', charactersController.createCharacter)
router.get('/characters', charactersController.getCharacters)
router.get('/characters/:id', charactersController.getCharacterById)
router.put('/characters/:id', charactersController.updateCharacter)
router.delete('/characters/:id', charactersController.deleteCharacter)

router.post('/seasons', seasonsController.createSeason)
router.get('/seasons', seasonsController.getSeasons)
router.get('/seasons/:id', seasonsController.getSeasonById)
router.put('/seasons/:id', seasonsController.updateSeason)
router.delete('/seasons/:id', seasonsController.deleteSeason)

router.post('/seasons/:season_id/episodes', episodesController.createEpisode)
router.get('/episodes', episodesController.getEpisodes)
router.get('/episodes/:id', episodesController.getEpisodeById)
router.get('/seasons/:season_id/episodes', episodesController.getEpisodesBySeasonId)
router.put('/episodes/:id', episodesController.updateEpisode)
router.delete('/episodes/:id', episodesController.deleteEpisode)

export default router