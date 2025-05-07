from django.db import models

class Detection(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    bwd_packet_length_min = models.FloatField()
    bwd_packet_length_std = models.FloatField()
    init_win_bytes_forward = models.FloatField()
    init_win_bytes_backward = models.FloatField()
    fwd_psh_flags = models.FloatField()
    average_packet_size = models.FloatField()
    psh_flag_count = models.FloatField()
    bwd_packets_per_second = models.FloatField()
    bwd_header_length = models.FloatField()
    bwd_packet_length_mean = models.FloatField()
    fwd_header_length = models.FloatField()
    packet_length_std = models.FloatField()
    packet_length_mean = models.FloatField()
    avg_bwd_segment_size = models.FloatField()
    fwd_header_length_1 = models.FloatField()
    min_seg_size_forward = models.FloatField()
    bwd_packet_length_max = models.FloatField()
    packet_length_variance = models.FloatField()
    fwd_packet_length_max = models.FloatField()
    fwd_packet_length_mean = models.FloatField()
    flow_bytes_per_second = models.FloatField()
    fwd_iat_min = models.FloatField()
    total_length_of_fwd_packets = models.FloatField()
    label = models.IntegerField()  # 0 for Normal, 1 for Attack

    def __str__(self):
        return f"Detection at {self.timestamp} - Label: {self.label}"
