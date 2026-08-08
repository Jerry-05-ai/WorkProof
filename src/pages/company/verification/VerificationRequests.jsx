import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, XCircle, Clock, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Header } from '../../../components/layout/Header';
import { Sidebar } from '../../../components/layout/Sidebar';
import { Navigation } from '../../../components/layout/Navigation';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { useApp } from '../../../store/context';
import toast from 'react-hot-toast';

const mockVerificationRequests = [
  {
    id: 'req_1',
    skill: 'Python',
    type: 'Skill Verification',
    status: 'pending',
    submitted: '2026-07-24',
    evidence: ['Project: Backend API v2', 'Cert: Python Advanced (Coursera)'],
  },
  {
    id: 'req_2',
    skill: 'AWS Cloud Architecture',
    type: 'Skill Verification',
    status: 'pending',
    submitted: '2026-07-25',
    evidence: ['Project: AWS Migration', 'Cert: AWS Solutions Architect'],
  },
  {
    id: 'req_3',
    skill: 'React',
    type: 'Skill Verification',
    status: 'approved',
    submitted: '2026-06-15',
    evidence: ['Project: Frontend Redesign'],
    reviewedBy: 'Sarah Ahmed',
    reviewedDate: '2026-06-16',
  },
];

export const VerificationRequests = () => {
  const { state, dispatch } = useApp();
  const [requests, setRequests] = useState(mockVerificationRequests);
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'approve' | 'reject'
  const [rejectReason, setRejectReason] = useState('');

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  const handleAction = (request, action) => {
    setSelectedRequest(request);
    setModalAction(action);
    setRejectReason('');
    setShowModal(true);
  };

  const handleConfirm = () => {
    const updatedRequests = requests.map(r => {
      if (r.id === selectedRequest.id) {
        return {
          ...r,
          status: modalAction === 'approve' ? 'approved' : 'rejected',
          reviewedBy: state.currentUser?.name || 'Admin',
          reviewedDate: new Date().toISOString().split('T')[0],
          reason: modalAction === 'reject' ? rejectReason : null,
        };
      }
      return r;
    });
    setRequests(updatedRequests);

    const notifTitle = modalAction === 'approve'
      ? 'Verification Request Approved'
      : 'Verification Request Rejected';
    const notifMsg = modalAction === 'approve'
      ? `Your ${selectedRequest.skill} skill verification was approved by NovaTech Solutions.`
      : `Your ${selectedRequest.skill} skill verification was rejected. Reason: ${rejectReason || 'Not specified'}`;

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif_${Date.now()}`,
        type: 'verification',
        title: notifTitle,
        message: notifMsg,
        read: false,
        createdAt: new Date().toISOString(),
        link: '/employee/privacy',
      },
    });

    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: `act_${Date.now()}`,
        actor: state.currentUser?.name || 'Admin',
        actorRole: 'COMPANY_ADMIN',
        action: modalAction === 'approve' ? 'EVIDENCE_VERIFIED' : 'VERIFICATION_REJECTED',
        target: `${selectedRequest.skill}`,
        timestamp: new Date().toISOString(),
        status: modalAction === 'approve' ? 'SUCCESS' : 'REJECTED',
        metadata: { skill: selectedRequest.skill },
      },
    });

    toast.success(
      modalAction === 'approve'
        ? `${selectedRequest.skill} skill verified!`
        : `Verification rejected for ${selectedRequest.skill}`
    );
    setShowModal(false);
  };

  const statusVariant = (status) => {
    if (status === 'approved') return 'success';
    if (status === 'rejected') return 'danger';
    return 'warning';
  };

  const statusIcon = (status) => {
    if (status === 'approved') return <CheckCircle2 className="h-4 w-4 text-success" />;
    if (status === 'rejected') return <XCircle className="h-4 w-4 text-danger" />;
    return <Clock className="h-4 w-4 text-warning" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
          <Header />
          <main className="flex-1 p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text">Verification Requests</h2>
                <p className="text-muted mt-1">Review and approve employee skill verifications</p>
              </div>
              {pendingCount > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-xl">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="text-sm font-semibold text-warning">{pendingCount} Pending</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Requests', value: requests.length, color: 'bg-primary/10 text-primary' },
                { label: 'Pending Review', value: requests.filter(r => r.status === 'pending').length, color: 'bg-warning/10 text-warning' },
                { label: 'Approved', value: requests.filter(r => r.status === 'approved').length, color: 'bg-success/10 text-success' },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface rounded-2xl border border-border shadow-sm p-5 text-center transition-all duration-300 hover:shadow-md hover:border-border-strong hover:-translate-y-0.5">
                  <div className={`text-2xl font-bold mb-1 tabular-nums ${stat.color.split(' ')[1]}`}>{stat.value}</div>
                  <div className="text-xs text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Requests List */}
            <div className="space-y-4">
              {requests.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden"
                >
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-primary/10 rounded-xl">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-text">
                              {req.skill} Skill Verification
                            </h3>
                            <Badge variant={statusVariant(req.status)} size="sm">
                              <span className="flex items-center gap-1">
                                {statusIcon(req.status)}
                                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted mt-0.5">
                            Submitted on {req.submitted}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {req.status === 'pending' && (
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleAction(req, 'approve')}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleAction(req, 'reject')}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {expandedId === req.id ? (
                          <ChevronUp className="h-4 w-4 text-muted" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted" />
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === req.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border"
                      >
                        <div className="p-5 space-y-4">
                          <div className="grid lg:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Evidence Provided</p>
                              {req.evidence.map((ev, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-text mb-1">
                                  <FileText className="h-3.5 w-3.5 text-primary" />
                                  {ev}
                                </div>
                              ))}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Request Details</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted">Type</span>
                                  <span className="text-text font-medium capitalize">{req.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted">Submitted</span>
                                  <span className="text-text font-medium">{req.submitted}</span>
                                </div>
                                {req.reviewedBy && (
                                  <div className="flex justify-between">
                                    <span className="text-muted">Reviewed By</span>
                                    <span className="text-text font-medium">{req.reviewedBy}</span>
                                  </div>
                                )}
                                {req.reviewedDate && (
                                  <div className="flex justify-between">
                                    <span className="text-muted">Review Date</span>
                                    <span className="text-text font-medium">{req.reviewedDate}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {req.reason && (
                            <div className="bg-danger/5 border border-danger/20 rounded-lg p-3">
                              <p className="text-xs font-medium text-danger mb-1">Rejection Reason</p>
                              <p className="text-sm text-muted">{req.reason}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {requests.length === 0 && (
                <div className="bg-surface rounded-xl border border-border shadow-sm p-12 text-center">
                  <ShieldCheck className="h-12 w-12 text-muted mx-auto mb-4" />
                  <p className="text-text font-medium mb-1">No verification requests</p>
                  <p className="text-muted text-sm">Employee verification requests will appear here.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Navigation />

      {/* Action Confirm Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalAction === 'approve' ? 'Approve Verification' : 'Reject Verification'}
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${modalAction === 'approve' ? 'bg-success/10 border border-success/20' : 'bg-danger/10 border border-danger/20'}`}>
              <p className={`text-sm font-medium ${modalAction === 'approve' ? 'text-success' : 'text-danger'}`}>
                {modalAction === 'approve'
                  ? `Approve ${selectedRequest.skill} skill verification?`
                  : `Reject ${selectedRequest.skill} skill verification?`}
              </p>
            </div>
            <div className="bg-surface-2 rounded-lg p-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted">Skill</span>
                <span className="font-medium text-text">{selectedRequest.skill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Evidence</span>
                <span className="font-medium text-text">{selectedRequest.evidence.join(', ')}</span>
              </div>
            </div>
            {modalAction === 'reject' && (
              <div>
                <label className="block text-sm font-medium text-text mb-2">Rejection Reason</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Explain why this verification is being rejected..."
                  className="w-full p-3 rounded-lg border border-border bg-surface-2 text-sm text-text placeholder-muted focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  rows={3}
                />
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                variant={modalAction === 'approve' ? 'success' : 'danger'}
                className="flex-1"
                onClick={handleConfirm}
              >
                {modalAction === 'approve' ? (
                  <><CheckCircle2 className="h-4 w-4 mr-2" />Approve</>
                ) : (
                  <><XCircle className="h-4 w-4 mr-2" />Reject</>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
