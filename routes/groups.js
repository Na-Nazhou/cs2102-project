const router = require('express').Router({ mergeParams: true });
const groups = require('../controllers/groups_controller');
const group_memberships_routes = require('./group_memberships');
const TAs = require('../controllers/TAs_controller');
const log = require('../helpers/logging');
const { ensureAuthorised } = require('../permissions');
const { canShowGroup, canCreateGroup, canUpdateGroup, canDeleteGroup } = require('../permissions/groups');

router.use((req, res, next) => {
  log.controller('Groups controller handling the request');
  next();
});

router.get(
  '/new',
  ensureAuthorised(req => canCreateGroup(req.user, req.params.semester_name, req.params.module_code)),
  groups.new
);
router.post(
  '/',
  ensureAuthorised(req => canCreateGroup(req.user, req.params.semester_name, req.params.module_code)),
  groups.create
);
router.get(
  '/:name',
  ensureAuthorised(req => canShowGroup(req.user, req.params.semester_name, req.params.module_code, req.params.name)),
  groups.show
);
router.delete(
  '/:name',
  ensureAuthorised(req => canDeleteGroup(req.user, req.params.semester_name, req.params.module_code)),
  groups.delete
);
router.get(
  '/:name/edit',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  groups.edit
);
router.put(
  '/:name',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  groups.update
);
router.get(
  '/:name/TAs',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  TAs.edit
);
router.post(
  '/:name/TAs',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  TAs.update
);

// Nest member routes within groups
router.use('/:name/students', group_memberships_routes);

module.exports = router;
