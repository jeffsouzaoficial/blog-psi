module Jekyll
  module DateFilter
    def date_pt_br(date)
      months = %w(janeiro fevereiro março abril maio junho julho agosto setembro outubro novembro dezembro)
      "#{date.strftime('%-d')} de #{months[date.month - 1]} de #{date.strftime('%Y')}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::DateFilter)
