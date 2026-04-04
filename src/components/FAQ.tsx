import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Adly는 어떤 서비스인가요?',
    a: 'Adly는 디지털 광고에 필요한 분석, 자동화, 보안, AI 솔루션을 하나의 플랫폼에서 통합 관리할 수 있는 Ad-Tech 솔루션 허브입니다.',
  },
  {
    q: '무료 체험이 가능한가요?',
    a: '네, 14일간 모든 기능을 무료로 체험하실 수 있습니다. 신용카드 정보 없이 바로 시작할 수 있습니다.',
  },
  {
    q: '기존 시스템과 연동이 가능한가요?',
    a: '100개 이상의 서드파티 서비스와 연동을 지원합니다. REST API와 Webhook을 통해 커스텀 연동도 가능합니다.',
  },
  {
    q: '데이터 보안은 어떻게 관리되나요?',
    a: 'SOC2 Type II, GDPR, ISO 27001 인증을 보유하고 있으며, 모든 데이터는 AES-256으로 암호화됩니다.',
  },
  {
    q: '팀 규모에 따른 요금제가 있나요?',
    a: 'Starter, Pro, Enterprise 3가지 요금제를 제공합니다. 팀 규모와 필요한 기능에 따라 유연하게 선택할 수 있습니다.',
  },
]

export default function FAQ() {
  return (
    <section className="w-full px-5 pt-12 pb-5">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight mb-1">FAQ</h2>
        <p className="text-muted-foreground text-xs">자주 묻는 질문을 확인해보세요.</p>
      </div>

      <Accordion className="space-y-1.5">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-white/40 dark:border-border/40 rounded-xl px-4 bg-white/50 dark:bg-white/[0.03] backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] data-[state=open]:bg-white/70 dark:data-[state=open]:bg-white/[0.05]"
          >
            <AccordionTrigger className="text-xs font-medium hover:no-underline py-3.5">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground pb-3.5 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
